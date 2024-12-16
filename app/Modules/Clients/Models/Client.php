<?php

namespace App\Modules\Clients\Models;

use App\Modules\Module\Models\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'client_has_modules', 'client_id', 'module_id');
    }
}
