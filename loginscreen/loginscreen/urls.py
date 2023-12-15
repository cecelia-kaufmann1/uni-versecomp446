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
from . import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('accounts/', include("django.contrib.auth.urls")), 
    path('', LoginView.as_view(), name = 'login'),
    path("home/", views.home_template, name="home"),
    path('logout/', auth_views.LogoutView.as_view(template_name="logout.html"), name="logout"),
    path('signup/', SignUpView.as_view(), name='signup'),
    # path('dressup/', TemplateView.as_view(template_name="dressUp_template.html"), name='dressup'),
    path('chatroom/', views.chatroom_template, name='chatroom'),
    path('dressup/', views.run_dressup),
    path('game/',views.game_template, name = "game"),
    path('game_over/', views.game_over, name='game_over'),
    path('start_game/', views.start_game, name='start_game'),
    path('score_/', views.score, name='score'),
    path('settings/', views.run_settings, name="settings"),
    
    
    path('my-ajax-test/', views.testcall),
    path('update_sparkles/', views.update_sparkles), #keep! this is what allows us to get sparkle updates for dressUp.js

    path('get_sparkles/', views.get_sparkles),
    path('get_wearing/', views.get_wearing),
    path('update_wearing/', views.update_wearing),
    path('get_owns/', views.get_owns),
    path('update_owns/', views.update_owns),
    path('get_username/', views.get_username),

    path('update_accessibility/', views.update_accessibility),
    path('get_accessibility/', views.get_accessibility),


]
