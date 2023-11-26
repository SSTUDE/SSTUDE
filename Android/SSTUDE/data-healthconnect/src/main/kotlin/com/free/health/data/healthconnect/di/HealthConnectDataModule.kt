package com.free.health.data.healthconnect.di

import com.free.health.data.healthconnect.data.HealthDataCaloriesImpl
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
abstract class HealthConnectDataModule {

    @Binds
    internal abstract fun bindSleepData(
        healthConnectSleepImpl: HealthDataSleepImpl
    ): HealthDataSleep

//    @Binds
//    internal abstract fun bindWeightData(
//        healthConnectWeightImpl: HealthDataWeightImpl
//    ): HealthDataWeight

    @Binds
    internal abstract fun bindCaloriesData(
        healthConnectCaloriesImpl: HealthDataCaloriesImpl
    ): HealthDataCalories

    @Binds
    internal abstract fun bindStepsData(
        healthDataStepsImpl: HealthDataStepsImpl
    ): HealthDataSteps
}