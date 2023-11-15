package com.free.health.data.healthconnect.di

import com.free.health.data.healthconnect.api.MainService
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
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

@Module
@InstallIn(SingletonComponent::class)
object MainServiceModule {
    @Provides
    fun provideMainService(): MainService {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://your-api-url.com") // API의 base URL을 입력합니다.
            .addConverterFactory(GsonConverterFactory.create()) // GSON을 사용하여 JSON을 파싱합니다.
            // 필요한 경우 다른 Converters, Call Adapters를 추가합니다.
            .build()

        return retrofit.create(MainService::class.java)
    }
}
