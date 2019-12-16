<?php

namespace App\Http\Requests;

use App\Enums\TournamentStatus;
use Illuminate\Foundation\Http\FormRequest;

class TournamentUpdate extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'unique:tournaments,name,'.$this->route('tournament'),
            'status' => 'in:'.collect(TournamentStatus::getAll())->join(',')
        ];
    }
}
