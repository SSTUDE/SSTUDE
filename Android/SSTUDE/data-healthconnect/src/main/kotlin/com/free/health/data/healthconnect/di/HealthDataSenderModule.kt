package com.free.health.data.healthconnect.di

import com.free.health.data.healthconnect.api.HealthDataSender
import com.free.health.data.healthconnect.data.HealthDataCaloriesImpl
import com.free.health.data.healthconnect.data.HealthDataSenderImpl
import com.free.health.data.healthconnect.data.HealthDataSleepImpl
import com.free.health.data.healthconnect.data.HealthDataStepsImpl
//import com.free.health.data.healthconnect.data.HealthDataWeightImpl
import com.free.health.domain.healthdata.HealthDataCalories
import com.free.health.domain.healthdata.HealthDataSleep
import com.free.health.domain.healthdata.HealthDataSteps
//import com.free.health.domain.healthdata.HealthDataWeight
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers

@Module
@InstallIn(SingletonComponent::class)
abstract class HealthDataSenderModule {
    @Binds
    internal abstract fun bindHealthDataSender(healthDataSenderImpl: HealthDataSenderImpl): HealthDataSender
}
