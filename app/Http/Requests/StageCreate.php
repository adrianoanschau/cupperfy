<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StageCreate extends FormRequest
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
            'order' => 'required',
            'tournament_id' => 'required',
        ];
    }
}
