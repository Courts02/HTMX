from django.urls import path
from . import views
from .views import edit_user, update_user, example

urlpatterns = [
    path('', views.example, name='example'),
    path('sample-post/', views.sample_post, name='sample-post'),
    path('user/<int:id>/edit/', edit_user, name='edit_user'),
    path('user/<int:id>/', update_user, name='update_user'),
]
