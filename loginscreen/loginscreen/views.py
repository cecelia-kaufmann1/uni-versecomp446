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