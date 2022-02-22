from django.urls import path
from . import views

urlpatterns = [
    path('capture/', views.CaptureImage.as_view()),
    
]