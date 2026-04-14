"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView
from backendApp.views import index

urlpatterns = [
    path('admin/', admin.site.urls),

    # API routes
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/', include('backendApp.urls')),

    # React app (catch ALL routes)
    re_path(r'^.*$', index),
    # (r'^.*$') Any route not starting with /api/ or /admin/ # Will return index.html # React Router handles it
    # Make sure: path('api/', ...) comes BEFORE: re_path(r'^.*$', index) Otherwise API routes will break.
]