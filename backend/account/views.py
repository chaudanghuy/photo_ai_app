import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Account
from .serializers import AccountSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import AccountForm
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash, logout
from django.contrib.auth.decorators import login_required


def change_password(request):
  if request.method == 'POST':
    form = PasswordChangeForm(request.user, request.POST)
    if form.is_valid():
      user = form.save()
      update_session_auth_hash(request, user)  # Important!
      messages.success(request, 'Your password was successfully updated!')
      return redirect('change_password')
    else:
      messages.error(request, 'Please correct the error below.')
  else:
    form = PasswordChangeForm(request.user)
  return render(request, 'accounts/change_password.html', {
    'form': form
  })
  
def view_account_info(request):
  return render(request, 'accounts/account_info.html')

def logout_view(request):
  logout(request)
  messages.success(request, 'You have been logged out.')
  return redirect('login')  

# Create your views here.
class AccountAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def post(self, request, *args, **kwargs):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountDetailAPI(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(instance=account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        account = Account.objects.get(id=pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      
class AccountList(ListView):
    model = Account
    template_name = 'accounts/list.html'
    context_object_name = 'accounts'
    
class AccountCreateView(View):
    def get(self, request):
        form = AccountForm()
        return render(request, 'accounts/create.html', {'form': form})
    
    def post(self, request):
        form = AccountForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('account-list'))
        return render(request, 'accounts/create.html', {'form': form})    
    
class AccountEditView(View):
    def get(self, request, pk):
        account = Account.objects.get(id=pk)
        form = AccountForm(instance=account)
        return render(request, 'accounts/edit.html', {'form': form, 'account': account})
    
    def post(self, request, pk):
        account = Account.objects.get(id=pk)
        form = AccountForm(request.POST, instance=account)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('account-list'))
        return render(request, 'accounts/edit.html', {'form': form, 'account': account})          