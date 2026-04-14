from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import ProjectViewSet, TaskViewSet, RegisterView

# ---------------- MAIN ROUTER ----------------
router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')

# ---------------- NESTED ROUTER (TASKS) ----------------
project_router = NestedDefaultRouter(router, r'projects', lookup='project')
project_router.register('tasks', TaskViewSet, basename='project-tasks')

# ---------------- URL PATTERNS ----------------
urlpatterns = [
    path('', include(router.urls)),
    path('', include(project_router.urls)),
    path('register/', RegisterView.as_view(), name='register')
]