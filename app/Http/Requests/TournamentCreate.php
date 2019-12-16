<?php

namespace App\Http\Requests;

use App\Enums\TournamentStatus;
use Illuminate\Foundation\Http\FormRequest;

class TournamentCreate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|unique:tournaments',
            'status' => 'in:'.collect(TournamentStatus::getAll())->join(',')
        ];
    }
}
