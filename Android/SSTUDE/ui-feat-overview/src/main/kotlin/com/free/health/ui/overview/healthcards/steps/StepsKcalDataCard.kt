package com.free.health.ui.overview.healthcards.steps

import android.content.res.Configuration
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.DirectionsWalk
import androidx.compose.material.icons.outlined.LocalFireDepartment
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.common.theme.caloriesBurnt
import com.free.health.ui.common.theme.steps
import com.free.health.ui.overview.healthcards.OverviewCard
import com.free.health.ui.overview.healthcards.OverviewCardUiState
import java.time.LocalDate

@Composable
fun StepsKcalDataCard(
    modifier: Modifier = Modifier,
    date: LocalDate,
    onClicked: () -> Unit,
) {
    val viewModel = hiltViewModel<StepsDataCardViewModel>().apply {
        setInitialDate(date)
    }
    StepsDataKcalCardContent(
        modifier = modifier,
        uiState = viewModel.uiState,
    onClicked = onClicked
    )
}

@Composable
fun StepsDataKcalCardContent(
    modifier: Modifier = Modifier,
    uiState: OverviewCardUiState,
    onClicked: () -> Unit,
) {
    val stepUiState = when (uiState) {
        is OverviewCardUiState.Loaded -> {
            val steps = uiState.amount.toFloatOrNull() ?: 0f
            val calculatedValue = steps * 0.0277f
            val roundedValue = String.format("%.0f", calculatedValue)
            OverviewCardUiState.Loaded(
                amount = roundedValue,
                type = uiState.type
            )
        }
        else -> uiState
    }

    OverviewCard(
        modifier = modifier,
        title = "소모 Kcal",
        state = stepUiState,
        backgroundColor = MaterialTheme.colorScheme.caloriesBurnt,
        icon = Icons.Outlined.LocalFireDepartment,
        onClicked = onClicked
    )
}

//@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
//@Composable
//fun CaloriesBurntDataCardPreviewDark() {
//    SstudeTheme {
//        StepsDataCardContent(
//            uiState = OverviewCardUiState.Loaded(
//                amount = "9650",
//                type = "steps"
//            ),
//            onClicked = {}
//        )
//    }
//}
//
//@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
//@Composable
//fun CaloriesBurntDataCardPreviewLight() {
//    SstudeTheme {
//        StepsDataCardContent(
//            uiState = OverviewCardUiState.Loaded(
//                amount = "9650",
//                type = "steps"
//            ),
//            onClicked = {}
//        )
//    }
//}

//@Preview(uiMode = Configuration.UI_MODE_NIGHT_NO)
//@Composable
//fun CaloriesBurntDataCardPreviewLoading() {
//    SstudeTheme {
//        StepsDataCardContent(
//            uiState = OverviewCardUiState.Loading,
//            onClicked = {}
//        )
//    }
//}