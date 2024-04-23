from rest_framework import serializers
from .models import Money

class MoneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Money
        fields = '__all__'
        
class MoneyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Money
        fields = ['order_code', 'money']