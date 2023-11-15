package com.free.health.ui.overview.healthcards

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.free.health.data.healthconnect.reposistory.HealthRepository
import com.free.health.ui.navigation.NavRoute
import com.free.health.ui.navigation.NavigationManager
import com.free.health.data.healthconnect.entity.request.LoginRequest
import com.free.health.data.healthconnect.api.HealthDataSender
import com.free.health.data.healthconnect.entity.request.RecordRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import javax.inject.Inject
import kotlin.math.roundToInt

data class DataCardViewState(
    val selectedDate: LocalDate = LocalDate.now()
)

@HiltViewModel
public class DataCardViewModel @Inject constructor(
    private val navigationManager: NavigationManager,
    private val healthRepository: HealthRepository,
    private val healthDataSender: HealthDataSender
) : ViewModel() {

    var uiState by mutableStateOf(DataCardViewState())
        private set

    fun onDateSelected(dateSelected: LocalDate) {
        uiState = uiState.copy(selectedDate = dateSelected)
    }

//    fun onSleepClicked() {
//        navigationManager.navigate(NavRoute.Sleep)
//    }
//
//    fun onWeightClicked() {
//        navigationManager.navigate(NavRoute.Weight)
//    }
    fun sendHealthData(request: LoginRequest) {

        viewModelScope.launch {
            Log.d("DataCardViewModel", "여기서 string잘들어옴?: ${request.certification}")
            val response = healthRepository.login(request.certification)
            if (response.isSuccessful) {
                val accessToken = "Bearer " + response.body()?.accessToken
                Log.d("DataCardViewModel", "Access Token이 들어왓다: $accessToken")
                if (accessToken != null) {
                    sendRecordData(accessToken)
                } else {
                    println("Access token is null")
                }
            } else {
                println("Login failed: ${response.code()}")
            }
        }
    }

    private suspend fun sendRecordData(accessToken: String) {
//        val from = LocalDateTime.now().minusDays(1)
//        val from = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0)
//        val until = LocalDateTime.now()
        val now = LocalDateTime.now(ZoneId.of("Asia/Seoul")) // 현재 한국 시간
        val from = now.withHour(0).withMinute(0).withSecond(0) // 어제의 한국 0시 0분 0초
        val until = now.withHour(23).withMinute(59).withSecond(59) // 현재 한국 시간


        val steps = healthDataSender.readSteps(from, until)
        val sleepDuration = healthDataSender.readSleepSessions(from, until)
//        val activeCalories = healthDataSender.readBurnt(from, until)
        val activeCalories = (steps * 0.0277).roundToInt()
        val consumedCalories = healthDataSender.readConsumed(from, until)

        Log.d("저장","걸음수:$steps")
        Log.d("저장","시간:$from ~ $until")

        val recordRequest = RecordRequest(steps, sleepDuration, activeCalories, consumedCalories)
        val response = healthRepository.sendRecordData(recordRequest, accessToken)

        if (response.isSuccessful) {
            println("Record data sent successfully")
        } else {
            println("Failed to send record data: ${response.code()}")
        }
    }

    companion object {
        private val LOG_TAG = DataCardViewModel::class.java.simpleName
    }
}