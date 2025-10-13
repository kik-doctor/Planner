from .project import urlpatterns as project_urls
from .webhook import urlpatterns as webhook_urls

urlpatterns = [*project_urls, *webhook_urls]
