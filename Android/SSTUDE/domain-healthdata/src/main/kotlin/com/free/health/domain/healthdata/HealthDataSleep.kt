package com.free.health.domain.healthdata

import com.free.health.domain.healthdata.models.SleepSession
import java.time.LocalDateTime

interface HealthDataSleep {
    suspend fun readSleepSessions(
        from: LocalDateTime,
        until: LocalDateTime
    ): Result<List<SleepSession>>
}
