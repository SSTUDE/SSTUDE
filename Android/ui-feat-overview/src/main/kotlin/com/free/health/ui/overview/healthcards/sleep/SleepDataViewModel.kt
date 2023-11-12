package com.free.health.ui.overview.healthcards.sleep

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.free.health.domain.base.getDateTimeAtEndOfDay
import com.free.health.domain.base.getDateTimeAtStartOfDay
import com.free.health.domain.base.toHoursAndMins
import com.free.health.domain.healthdata.HealthDataSleep
import com.free.health.domain.healthdata.models.SleepSession
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import javax.inject.Inject

@HiltViewModel
class SleepDataCardViewModel @Inject constructor(
    private val sleepData: HealthDataSleep
) : ViewModel() {

    var uiState by mutableStateOf<OverviewCardUiState>(OverviewCardUiState.Loading)
        private set

    fun setInitialDate(date: LocalDate) {
        viewModelScope.launch {
            sleepData
                .readSleepSessions(
                    from = date.getDateTimeAtStartOfDay(),
                    until = date.getDateTimeAtEndOfDay()
                )
                .onSuccess(::onSleepDataReturned)
                .onFailure(::onSleepDataFailureReturned)
        }
    }

    private fun onSleepDataFailureReturned(throwable: Throwable) {
        Log.e(LOG_TAG, throwable.message ?: "Error")
        uiState = OverviewCardUiState.Error
    }

    private fun onSleepDataReturned(it: List<SleepSession>) {
        uiState = if (it.isEmpty()) {
            OverviewCardUiState.NoData
        } else {
            OverviewCardUiState.Loaded(
                amount = it.first().duration?.toHoursAndMins() ?: "",
                subtitle = getStartAndEndTime(it.first()),
                type = it.first().title ?: ""
            )
        }
    }

    private fun getStartAndEndTime(data: SleepSession): String {
        val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("hh:mma")
            .withZone(ZoneId.systemDefault())
        return "${formatter.format(data.startTime)} - ${formatter.format(data.endTime)}"
    }

    companion object {
        private val LOG_TAG = SleepDataCardViewModel::class.java.simpleName
    }
}