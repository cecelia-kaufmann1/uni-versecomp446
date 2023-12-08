"""
URL configuration for loginscreen project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path, include
from .views import LoginView
from django.views.generic.base import TemplateView
from django.contrib.auth import views as auth_views
from .views import SignUpView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('accounts/', include("django.contrib.auth.urls")), 
    path('', LoginView.as_view(), name = 'login'),
    path("home/", TemplateView.as_view(template_name="layout.html"), name="home"),
    path('logout/', auth_views.LogoutView.as_view(), name = "logout"),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('dressup/', TemplateView.as_view(template_name="dressUp_template.html"), name='dressup'),

]
