<?php

namespace App\Enums;

class TournamentStatus
{
    const CONFIG = 'CONFIG';
    const SUBSCRIPTIONS = 'SUBSCRIPTIONS';
    const STARTED = 'STARTED';
    const FINISHED = 'FINISHED';

    static function getAll() {
        return [
            self::CONFIG,
            self::SUBSCRIPTIONS,
            self::STARTED,
            self::FINISHED,
        ];
    }
}
