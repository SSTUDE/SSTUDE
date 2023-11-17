package com.free.health.ui.overview.healthcards.total

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.free.health.domain.base.getDateTimeAtEndOfDay
import com.free.health.domain.base.getDateTimeAtStartOfDay
import com.free.health.domain.healthdata.HealthDataCalories
import com.free.health.domain.healthdata.HealthDataSteps
import com.free.health.domain.healthdata.models.CaloriesConsumed
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.time.LocalDate
import javax.inject.Inject

@HiltViewModel
internal class TotalCaloriesViewModel @Inject constructor(
    private val caloriesDataCalories: HealthDataCalories,
    private val healthDataSteps: HealthDataSteps
) : ViewModel() {

    var uiState by mutableStateOf(TotalCaloriesView())
        private set

//    fun setInitialDate(date: LocalDate) {
//        viewModelScope.launch {
//            caloriesDataCalories
//                .readConsumed(
//                    until = date.getDateTimeAtEndOfDay(),
//                    from = date.getDateTimeAtStartOfDay()
//                )
//                .onSuccess { onCaloriesConsumedReturned(it) }
//                .onFailure { onCaloriesConsumedFailureReturned(it) }
//        }
//    }
    fun setInitialDate(date: LocalDate) {
        viewModelScope.launch {
            caloriesDataCalories
                .readConsumed(
                    until = date.getDateTimeAtEndOfDay(),
                    from = date.getDateTimeAtStartOfDay()
                )
                .onSuccess { onCaloriesConsumedReturned(it) }
                .onFailure { onCaloriesConsumedFailureReturned(it) }

            healthDataSteps
                .readSteps(
                    until = date.getDateTimeAtEndOfDay(),
                    from = date.getDateTimeAtStartOfDay()
                )
                .onSuccess { onStepsDataReturned(it) }  // 걸음 수를 가져오는 로직을 추가합니다.
                .onFailure { onStepsDataFailureReturned(it) }
        }
    }

    private fun onStepsDataReturned(steps: Int?) {
        if (steps != null) {
            val kcal = steps * 0.0277f
            val roundedKcal = Math.round(kcal).toInt()  // 소수 첫째 자리에서 반올림합니다.
            uiState = uiState.copy(caloriesBurnt = roundedKcal)  // 계산된 칼로리를 uiState에 저장합니다.
        }
    }

    private fun onStepsDataFailureReturned(throwable: Throwable) {
        Log.e(LOG_TAG, throwable.message ?: "Error")
    }

    private fun onCaloriesConsumedReturned(calories: CaloriesConsumed) {
        uiState = uiState.copy(
            caloriesConsumed = calories.consumed,
            proteinGrams = calories.proteinGram,
            fatGrams = calories.fatGrm,
            carbsGrams = calories.carbGram
        )
    }


    private fun onCaloriesConsumedFailureReturned(throwable: Throwable) {
        Log.e(LOG_TAG, throwable.message ?: "Error")
    }

    companion object {
        private val LOG_TAG = TotalCaloriesViewModel::class.java.simpleName
    }
}