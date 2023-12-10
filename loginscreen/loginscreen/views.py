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
            print("User successfully logged in!")
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
    
    print("username", request.user)
    print("sparkles", request.user.profile.sparkles)
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

def run_dressup(request): 
    print("username", request.user)
    print("sparkles", request.user.profile.sparkles)
    # create data dictionary 
    return render(request, 'dressUp_template.html', {'username': request.user, 'sparkles': request.user.profile.sparkles}) 

def testcall(request):
   response =  request.user
   #Send the response
   return HttpResponse(response)