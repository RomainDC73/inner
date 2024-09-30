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

    // Accesseur pour déchiffrer la description
    public function getDescriptionAttribute($value)
    {
        try {
            return decrypt($value);
        } catch (DecryptException $e) {
            return null;
        }
    }

    // Mutateur pour chiffrer la description avant l'enregistrement
    public function setDescriptionAttribute($value)
    {
        $this->attributes['description'] = encrypt($value);
    }

    // Accesseur pour déchiffrer le chemin du fichier média
    public function getMediaPathAttribute($value)
    {
        return $value ? decrypt($value) : null;
    }

    // Mutateur pour chiffrer le chemin du fichier média
    public function setMediaPathAttribute($value)
    {
        $this->attributes['media_path'] = $value ? encrypt($value) : null;
    }

    // Accesseur pour déchiffrer le chemin du fichier audio
    public function getAudioPathAttribute($value)
    {
        return $value ? decrypt($value) : null;
    }

    // Mutateur pour chiffrer le chemin du fichier audio
    public function setAudioPathAttribute($value)
    {
        $this->attributes['audio_path'] = $value ? encrypt($value) : null;
    }
}
