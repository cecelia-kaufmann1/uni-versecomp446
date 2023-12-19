# from django.shortcuts import render
# from django.views import View

# class LoginView(View):
#     def get(self, request, *args, **kwargs):
#         return render(request, 'registration/login.html')  # Replace with the actual template path
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView
from accounts.models import Profile
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse


from json import dumps 
from django.http import HttpResponse



class LoginView(View):
    template_name = "registration/login.html"
    success_url = "home/"
    def get(self, request, *args, **kwargs):
        form = AuthenticationForm()
        return render(request, 'registration/login.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            login(request, form.get_user())
           
            if (request.user.profile.first_login):
                request.user.profile.sparkles = 50
                request.user.profile.owns = "0,10,21,22,"

                request.user.profile.save() #update the number 
            return redirect(self.success_url)
        else:
            print("Form is not valid:", form.errors)
            # Redirect to a success page or do something else
        return render(request, self.template_name, {'form': form})

class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/signup.html'
    success_url = reverse_lazy('login')  # Redirect to the login page upon successful registration

# class CustomLoginView(LoginView):
#     template_name = 'registration/login.html'  # You can customize the login template if needed


def send_dictionary(request): 
    # create data dictionary 
    dataDictionary = { 
        'hello': 'World', 
        'geeks': 'forgeeks', 
        'ABC': 123, 
        456: 'abc', 
        14000605: 1, 
        'list': ['geeks', 4, 'geeks'], 
        'dictionary': {'you': 'can', 'send': 'anything', 3: 1} 
    } 
    # dump data 
    dataJSON = dumps(dataDictionary) 
    return render(request, 'landing.html', {'data': dataJSON, 'username': request.user, 'sparkles': request.user.profile.sparkles}) 

# This means you can only do dress up logged in
@login_required(login_url='/')
def run_dressup(request): 
    # create data dictionary 
    return render(request, 'dressUp_template.html', {'username': request.user, 'sparkles': request.user.profile.sparkles}) 

def run_community_guidelines(request):
    return render(request, 'registration/guidelines.html')

def run_settings(request):
    return render(request, 'settings.html')

def testcall(request):
   response =  request.user
   #Send the response
   return HttpResponse(response)

def game_over(request):
    return render(request, 'gameOver.html')

def start_game(request):
    return render(request, 'startGame.html')

def score(request):
    return render(request, 'gameScore.html')

@login_required(login_url='/')
def chatroom_template(request):
    return render(request, 'chatroom_template.html')

@login_required(login_url="/")
def game_template(request):
    return render(request, 'gameSetUp_template.html')


@login_required(login_url="/")
def home_template(request):
    return render(request, 'home_template.html')

@csrf_exempt # this allows posts to be made without any admin stuff (no 404 errors)
def update_sparkles(request):
    if request.method == 'POST':
        current_profile = Profile.objects.get(user=request.user)
        current_profile.sparkles = request.POST["sparkles"]

        current_profile.save() #update the number of sparkles for the existing user

        return HttpResponse(current_profile.sparkles)
    
def get_sparkles(request):
    if request.method == 'GET':
        response = {'sparkles':  Profile.objects.get(user=request.user).sparkles}
        return JsonResponse(response)

@csrf_exempt # this allows posts to be made without any admin stuff (no 404 errors)
def update_wearing(request):
    if request.method == 'POST':
        current_profile = Profile.objects.get(user=request.user)
        current_profile.wearing = request.POST["wearing"]

        current_profile.save() #update the number of sparkles for the existing user

        return HttpResponse(current_profile.wearing)
    
def get_wearing(request):
    if request.method == 'GET':
        response = {'wearing':  Profile.objects.get(user=request.user).wearing}
        return JsonResponse(response) # return a JSON response https://testdriven.io/blog/django-ajax-xhr/ and https://djangocentral.com/django-ajax-with-jquery/#making-ajax-get-requests-with-django-and-jquery 
    
@csrf_exempt # this allows posts to be made without any admin stuff (no 404 errors)
def update_owns(request):
    if request.method == 'POST':
        current_profile = Profile.objects.get(user=request.user)
        current_profile.owns = request.POST["owns"]

        current_profile.save() #update the number of sparkles for the existing user

        return HttpResponse(current_profile.owns)
    
def get_owns(request):
    if request.method == 'GET':
        response = {'owns':  Profile.objects.get(user=request.user).owns}
        return JsonResponse(response) # return a JSON response https://testdriven.io/blog/django-ajax-xhr/ and https://djangocentral.com/django-ajax-with-jquery/#making-ajax-get-requests-with-django-and-jquery 
    
@csrf_exempt # this allows posts to be made without any admin stuff (no 404 errors)
def update_color(request):
    if request.method == 'POST':
        current_profile = Profile.objects.get(user=request.user)
        current_profile.color = request.POST["color"]

        current_profile.save() #update the number of sparkles for the existing user

        return HttpResponse(current_profile.color)
    
def get_color(request):
    if request.method == 'GET':
        response = {'color':  Profile.objects.get(user=request.user).color}
        return JsonResponse(response) 
    
def get_username(request):
    if request.method == 'GET':
        username = request.user.username
        response = {'username':  username}
        return JsonResponse(response) 


@csrf_exempt
def update_accessibility(request):
    if request.method == 'POST':
        current_profile = request.user.profile
        
        current_profile.volume = update_accessibility_element(request.POST["volume"])
        current_profile.font = update_accessibility_element(request.POST["font"])
        current_profile.font_size = update_accessibility_element(request.POST["font_size"])
        current_profile.buttons = update_accessibility_element(request.POST["buttons"])
        current_profile.colors = update_accessibility_element(request.POST["colors"])

        current_profile.save() #update the number of sparkles for the existing user

        return render(request, 'home_template.html')

def update_accessibility_element(item):
    if (item == "1"):
        return True
    else:
        return False

@csrf_exempt
def get_accessibility(request):
    if request.method == 'GET':
        response = {
            'volume':  request.user.profile.volume,
            'font': request.user.profile.font,
            'font_size': request.user.profile.font_size,
            'buttons':request.user.profile.buttons,
            'colors': request.user.profile.colors
        }
        return JsonResponse(response) 

@csrf_exempt
def get_layout_accessibility(request):
    if request.method == 'GET':
        response = {
            'volume':  request.user.profile.volume,
            'font': request.user.profile.font,
            'font_size': request.user.profile.font_size,
            'buttons':request.user.profile.buttons,
            'colors': request.user.profile.colors
        }
        return JsonResponse(response) 

@csrf_exempt
def get_colorblindness(request):
    if request.method == 'GET':
        response = {
            'colors': request.user.profile.colors
        }
        return JsonResponse(response) 

@csrf_exempt
def get_audio_preference(request):
    if request.method == 'GET':
        response = {
            'audio_preference': request.user.profile.volume
        }
        return JsonResponse(response) 

@csrf_exempt
def get_first_login(request):
    if request.method == 'GET':
        response = {
            'first_login': request.user.profile.first_login
        }
        return JsonResponse(response) 

@csrf_exempt # this allows posts to be made without any admin stuff (no 404 errors)
def update_first_login(request):
    if request.method == 'POST':
        current_profile = Profile.objects.get(user=request.user)
        current_profile.first_login = update_accessibility_element(request.POST["first_login"])

        current_profile.save() #update the number of sparkles for the existing user

        return HttpResponse(current_profile.first_login)

