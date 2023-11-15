package com.free.health.data.healthconnect.data

import com.free.health.data.healthconnect.api.HealthDataSender
import com.free.health.data.healthconnect.reposistory.HealthRepository
import java.time.LocalDateTime
import javax.inject.Inject


internal class HealthDataSenderImpl @Inject constructor(
    private val healthDataSteps: HealthDataStepsImpl,
    private val healthDataSleep: HealthDataSleepImpl,
    private val healthDataCalories: HealthDataCaloriesImpl,
    private val repository: HealthRepository
) : HealthDataSender {

    override suspend fun readSteps(from: LocalDateTime, until: LocalDateTime): Int {
        val stepsResult = healthDataSteps.readSteps(from, until)
        return stepsResult.getOrNull() ?: 0
    }

    override suspend fun readSleepSessions(from: LocalDateTime, until: LocalDateTime): Int {
        val sleepSessionsResult = healthDataSleep.readSleepSessions(from, until)
        return sleepSessionsResult.getOrNull()?.sumBy { it.duration?.toMinutes()?.toInt() ?: 0 }
            ?: 0
    }

    override suspend fun readBurnt(from: LocalDateTime, until: LocalDateTime): Int {
        val burntResult = healthDataCalories.readBurnt(from, until)
        return burntResult.getOrNull() ?: 0
    }

    override suspend fun readConsumed(from: LocalDateTime, until: LocalDateTime): Int {
        val consumedResult = healthDataCalories.readConsumed(from, until)
        return consumedResult.getOrNull()?.consumed ?: 0
    }
}


