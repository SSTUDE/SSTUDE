package com.free.health.ui.overview.healthcards.calories

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.free.health.domain.base.getDateTimeAtEndOfDay
import com.free.health.domain.base.getDateTimeAtStartOfDay
import com.free.health.domain.healthdata.HealthDataCalories
import com.free.health.domain.healthdata.models.CaloriesConsumed
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.time.LocalDate
import javax.inject.Inject

@HiltViewModel
class CaloriesDataCardViewModel @Inject constructor(
    private val caloriesDataCalories: HealthDataCalories
) : ViewModel() {

    var uiState by mutableStateOf<OverviewCardUiState>(OverviewCardUiState.Loading)
        private set

    fun setInitialDate(date: LocalDate) {
        viewModelScope.launch {
            caloriesDataCalories
                .readConsumed(
                    from = date.getDateTimeAtStartOfDay(),
                    until = date.getDateTimeAtEndOfDay(),
                )
                .onSuccess(::onCaloriesDataReturned)
                .onFailure(::onCaloriesDataFailureReturned)
        }
    }

    private fun onCaloriesDataFailureReturned(throwable: Throwable) {
        Log.e(LOG_TAG, throwable.message ?: "Error")
        uiState = OverviewCardUiState.Error
    }

    private fun onCaloriesDataReturned(calories: CaloriesConsumed) {
        uiState = if (calories.consumed == 0) {
            OverviewCardUiState.NoData
        } else {
            OverviewCardUiState.Loaded(
                amount = calories.consumed.toString(),
                type = "kcals"
            )
        }
    }

    companion object {
        private val LOG_TAG = CaloriesDataCardViewModel::class.java.simpleName
    }
}