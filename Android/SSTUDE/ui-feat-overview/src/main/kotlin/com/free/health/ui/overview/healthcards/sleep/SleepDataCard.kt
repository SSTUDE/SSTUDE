package com.free.health.ui.overview.healthcards.sleep

import android.content.res.Configuration
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.KingBed
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.common.theme.caloriesConsumed
import com.free.health.ui.common.theme.sleep
import com.free.health.ui.overview.healthcards.OverviewCard
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import java.time.LocalDate

@Composable
fun SleepDataCard(
    modifier: Modifier = Modifier,
    date: LocalDate,
    onClicked: () -> Unit
) {
    val viewModel = hiltViewModel<SleepDataCardViewModel>().apply { setInitialDate(date) }
    SleepDataCardContent(
        modifier = modifier,
        uiState = viewModel.uiState,
        onClicked = onClicked
    )
}

@Composable
fun SleepDataCardContent(
    modifier: Modifier = Modifier,
    uiState: OverviewCardUiState,
    onClicked: () -> Unit,
) {
    OverviewCard(
        modifier = modifier,
        title = "수면",
        state = uiState,
//        backgroundColor = MaterialTheme.colorScheme.sleep,
        backgroundColor = MaterialTheme.colorScheme.caloriesConsumed,
        icon = Icons.Outlined.KingBed,
        onClicked = onClicked
    )
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun OverviewScreenPreviewDark() {
    SstudeTheme {
        SleepDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "8h, 30m",
                subtitle = "9:35-8:45",
                type = "test"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun OverviewScreenPreviewLight() {
    SstudeTheme {
        SleepDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "8h, 30m",
                subtitle = "9:35-8:45",
                type = "test",
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun OverviewScreenPreviewLoading() {
    SstudeTheme {
        SleepDataCardContent(
            uiState = OverviewCardUiState.Loading,
            onClicked = {}
        )
    }
}