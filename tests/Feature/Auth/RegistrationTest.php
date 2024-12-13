<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Mail\Registration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
{
    // Fakes the mail sending during the test
    Mail::fake();

    // Send the request to register a new user
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert that the user is authenticated
    $this->assertAuthenticated();

    // Assert that the user is redirected to the dashboard
    $response->assertRedirect(route('dashboard', absolute: false));

    // Assert that the email was sent to the user's email address
    Mail::assertSent(Registration::class, function ($mail) {
        return $mail->hasTo('test@example.com');
    });
}


}
