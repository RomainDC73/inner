<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'mood_id', 'description', 'media_path', 'audio_path'];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function mood() {
        return $this->belongsTo(Mood::class);
    }

}
