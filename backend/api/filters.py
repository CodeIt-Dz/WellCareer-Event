from django_filters import rest_framework as filters
from django.utils import timezone
from .models import Offer
from .enums import Job_level, Contract_type
import datetime



class OfferFilter(filters.FilterSet):
    wilaya = filters.CharFilter(field_name="wilaya", lookup_expr='icontains')
    salary_min = filters.NumberFilter(field_name="salary", lookup_expr='gte')
    salary_max = filters.NumberFilter(field_name="salary", lookup_expr='lte')
    job_level = filters.ChoiceFilter(field_name="job_level", choices=[(tag.value, tag.name) for tag in Job_level])
    contract_type = filters.ChoiceFilter(field_name="contract_type", choices=[(tag.value, tag.name) for tag in Contract_type])
    last_n_days = filters.NumberFilter(method='filter_last_n_days')

    class Meta:
        model = Offer
        fields = ['wilaya', 'salary_min', 'salary_max', 'job_level', 'contract_type', 'last_n_days']

    def filter_last_n_days(self, queryset, name, value):
        if value is not None and value != 0 :
            try:
                days = int(value)  # Convert Decimal to integer
                date_threshold = timezone.now() - datetime.timedelta(days=days)
                return queryset.filter(start_date__gte=date_threshold)
            except (TypeError, ValueError):
                pass
        return queryset
