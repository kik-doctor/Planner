# Third party imports
import jwt
# Django imports
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from django.utils.deprecation import MiddlewareMixin

User = get_user_model()


class CookieAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Skip cookie check for webhooks
        if "webhooks" in request.path.lower():
            return
        referer = (request.META.get("HTTP_REFERER") or "").lower()
        # For admin panel, use different auth
        if "god-mode" in referer:
            return

        token = request.COOKIES.get("owsauth")
        if not token:
            # No cookie → clear session and logout
            if request.user.is_authenticated:
                logout(request)
            return

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            email = payload.get("email")

            # Once authenticated, skip cookie check
            if request.user.is_authenticated and email == request.user.email:
                return
                # If logged-in user differs → force re-login
                logout(request)

            user = User.objects.get(email=email)
            user.backend = 'django.contrib.auth.backends.ModelBackend'  # Required for login()
            login(request, user)
        except (jwt.DecodeError, jwt.ExpiredSignatureError, User.DoesNotExist):
            logout(request)
            return
