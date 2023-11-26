package com.free.health.ui.overview.healthcards.steps

import android.content.res.Configuration
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.DirectionsWalk
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.common.theme.steps
import com.free.health.ui.overview.healthcards.OverviewCard
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import java.time.LocalDate

@Composable
fun StepsDataCard(
    date: LocalDate,
    onClicked: () -> Unit,
) {
    val viewModel = hiltViewModel<StepsDataCardViewModel>().apply {
        setInitialDate(date)
    }
    StepsDataCardContent(
        uiState = viewModel.uiState,
    onClicked = onClicked
    )
}

@Composable
fun StepsDataCardContent(
    modifier: Modifier = Modifier,
    uiState: OverviewCardUiState,
    onClicked: () -> Unit,
) {
    OverviewCard(
        modifier = modifier,
        title = "걸음 수",
        state = uiState,
        backgroundColor = MaterialTheme.colorScheme.steps,
        icon = Icons.Outlined.DirectionsWalk,
        onClicked = onClicked
    )
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun CaloriesBurntDataCardPreviewDark() {
    SstudeTheme {
        StepsDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "9650",
                type = "steps"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesBurntDataCardPreviewLight() {
    SstudeTheme {
        StepsDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "9650",
                type = "steps"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesBurntDataCardPreviewLoading() {
    SstudeTheme {
        StepsDataCardContent(
            uiState = OverviewCardUiState.Loading,
            onClicked = {}
        )
    }
}