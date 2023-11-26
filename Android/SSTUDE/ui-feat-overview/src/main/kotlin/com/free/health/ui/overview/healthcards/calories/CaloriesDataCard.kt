package com.free.health.ui.overview.healthcards.calories

import android.content.res.Configuration
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Kitchen
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.common.theme.caloriesConsumed
import com.free.health.ui.common.theme.weight
import com.free.health.ui.overview.healthcards.OverviewCard
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import java.time.LocalDate

@Composable
fun CaloriesDataCard(
    modifier: Modifier = Modifier,
    date: LocalDate,
    onClicked: () -> Unit,
) {
    val viewModel = hiltViewModel<CaloriesDataCardViewModel>().apply {
        setInitialDate(date)
    }
    CaloriesDataCardContent(
        modifier = modifier,
        uiState = viewModel.uiState,
        onClicked = onClicked
    )
}

@Composable
fun CaloriesDataCardContent(
    modifier: Modifier = Modifier,
    uiState: OverviewCardUiState,
    onClicked: () -> Unit,
) {
    OverviewCard(
        modifier = modifier,
        title = "섭취 Kcal",
        state = uiState,
//        backgroundColor = MaterialTheme.colorScheme.caloriesConsumed,
        backgroundColor = MaterialTheme.colorScheme.weight,
        icon = Icons.Outlined.Kitchen,
        onClicked = onClicked
    )
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun CaloriesDataCardPreviewDark() {
    SstudeTheme {
        CaloriesDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "1001",
                type = "kcals"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesDataCardPreviewLight() {
    SstudeTheme {
        CaloriesDataCardContent(
            uiState = OverviewCardUiState.Loaded(
                amount = "1001",
                type = "kcals"
            ),
            onClicked = {}
        )
    }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
@Composable
fun CaloriesDataCardPreviewLoading() {
    SstudeTheme {
        CaloriesDataCardContent(
            uiState = OverviewCardUiState.Loading,
            onClicked = {}
        )
    }
}