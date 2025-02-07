from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('contact/', contact_view, name='contact'),
    path('contact/success/', success_view, name='success_page'),
    path('cv/', create_cv, name='create_cv'),
    path('cv/list/', cv_list, name='cv_list'),
    path('share/email/<int:cv_id>/', share_cv_email, name='share_cv_email'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
