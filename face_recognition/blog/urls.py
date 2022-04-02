from django.urls import path
from . import views as user_views

urlpatterns = [
    path('camera/<str:subject_name>',user_views.camera, name='camera'),
    path('subjects/',user_views.getGubjects, name='subjects'),
    path('summary/<str:subject_name>',user_views.summaryId, name='summary_id'),
    path('index/',user_views.indexView, name='index'),
]
