from django.shortcuts import render
from django.http import HttpResponse
from tutorial.forms import SampleForm
from django.views.decorators.csrf import csrf_exempt

def sample_post(request, *args, **kwargs):
    print(f'{request.POST = }')
    form = SampleForm(request.POST or None)
    name = request.POST.get('name', '')
    email = request.POST.get('email', '')
    favourite_colour = request.POST.get('favourite_color', '')

    if name and email and favourite_colour:
        print(f'{form.cleaned_data = }')
        return HttpResponse('<p class="success">Form submitted successfully! ✅</p>')
    else:
        return HttpResponse('<p class="error">Please provide both name and email and favourite color.❌</p>')

def example(request):
    return render(request, 'example.html')

#  Handle GET request for profile edit
def edit_user(request, id):
    return render(request, 'edit_user.html', {'user_id': id})

# Handle POST request (update user profile)
@csrf_exempt  # Disable CSRF for simplicity (not recommended for production)
def update_user(request, id):
    if request.method == "POST":
        name = request.POST.get("name", "Unknown")
        bio = request.POST.get("bio", "No bio provided")

        return HttpResponse(f"""
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{bio}</p>
                <button class="btn btn-primary" onclick="window.location.href='/user/{id}/edit'">Click To Edit</button>
            </div>
        </div> 
        """)
    
def example(request):
    return render(request, 'example.html')