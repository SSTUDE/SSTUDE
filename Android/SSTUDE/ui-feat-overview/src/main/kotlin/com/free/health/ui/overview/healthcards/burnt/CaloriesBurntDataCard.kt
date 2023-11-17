package com.free.health.ui.overview.healthcards.burnt

import android.content.res.Configuration
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.LocalFireDepartment
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.common.theme.caloriesBurnt
import com.free.health.ui.overview.healthcards.OverviewCard
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import java.time.LocalDate

@Composable
fun CaloriesBurntDataCard(
    modifier: Modifier = Modifier,
    date: LocalDate,
    onClicked: () -> Unit,
) {
    val viewModel = hiltViewModel<CaloriesBurntDataCardViewModel>().apply {
        setInitialDate(date)
    }
    CaloriesBurntDataCardContent(
        modifier = modifier,
        uiState = viewModel.uiState,
        onClicked = onClicked
    )
}

@Composable
fun CaloriesBurntDataCardContent(
    modifier: Modifier = Modifier,
    uiState: OverviewCardUiState,
    onClicked: () -> Unit,
) {
    OverviewCard(
        modifier = modifier,
        title = "소모 Kcal",
        state = uiState,
        backgroundColor = MaterialTheme.colorScheme.caloriesBurnt,
        icon = Icons.Outlined.LocalFireDepartment,
        onClicked = onClicked
    )
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun CaloriesBurntDataCardPreviewDark() {
    SstudeTheme {
        CaloriesBurntDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "1000",
                type = "kcals"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesBurntDataCardPreviewLight() {
    SstudeTheme {
        CaloriesBurntDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "1000",
                type = "kcals"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesBurntDataCardPreviewLoading() {
    SstudeTheme {
        CaloriesBurntDataCardContent(
            uiState = OverviewCardUiState.Loading,
            onClicked = {}
        )
    }
}