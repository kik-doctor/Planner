# Django imports
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout

# Third party imports
import jwt

User = get_user_model()

class CookieAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get("owsauth")
        if not token:
            # No cookie → clear session and logout
            logout(request)
            return

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            email = payload.get("email")
            user = User.objects.get(email=email)
            user.backend = 'django.contrib.auth.backends.ModelBackend'  # Required for login()
            login(request, user)
        except (jwt.DecodeError, jwt.ExpiredSignatureError, User.DoesNotExist):
            return
