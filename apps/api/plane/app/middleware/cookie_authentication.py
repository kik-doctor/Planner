# Django imports
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout

# Third party imports
import jwt

User = get_user_model()

class CookieAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if "webhooks" in request.path.lower():
            return

        token = request.COOKIES.get("owsauth")
        if not token:
            # No cookie → clear session and logout
            if request.user.is_authenticated:
                logout(request)
            return

        # Once authenticated, skip cookie check
        if token and request.user.is_authenticated:
            return

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            email = payload.get("email")
            user = User.objects.get(email=email)
            user.backend = 'django.contrib.auth.backends.ModelBackend'  # Required for login()
            login(request, user)
        except (jwt.DecodeError, jwt.ExpiredSignatureError, User.DoesNotExist):
            return
