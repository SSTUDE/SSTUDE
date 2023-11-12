package com.free.health.ui.overview.healthcards

sealed class OverviewCardUiState {
    object Loading : OverviewCardUiState()
    object Error : OverviewCardUiState()
    object NoData : OverviewCardUiState()
    data class Loaded(
        val subtitle: String? = null,
        val amount: String,
        val type: String
    ) : OverviewCardUiState()
}