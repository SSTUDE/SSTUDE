package com.free.health.ui.overview.healthcards.total

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.himanshoe.charty.pie.PieChart
import com.himanshoe.charty.pie.config.PieConfig
import com.himanshoe.charty.pie.config.PieData
import com.free.health.ui.common.theme.*
import java.time.LocalDate

@Composable
internal fun TotalCard(date: LocalDate) {
    val viewModel = hiltViewModel<TotalCaloriesViewModel>().apply {
        setInitialDate(date)
    }
    TotalCardContent(uiState = viewModel.uiState)
}

@Composable
internal fun TotalCardContent(
    modifier: Modifier = Modifier,
    uiState: TotalCaloriesView
) {
    OutlinedCard(
        modifier = modifier
            .fillMaxWidth()
            .wrapContentHeight()
    ) {

        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Box(Modifier.weight(1F)) {
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            color = MaterialTheme.colorScheme.onSurface,
                            style = MaterialTheme.typography.titleMedium,
                            text = "${uiState.caloriesConsumed} kcal"
                        )
                        Text(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            style = MaterialTheme.typography.bodyMedium,
                            text = "섭취"
                        )
                    }
                }
                Box(
                    Modifier
                        .weight(1.5F)
                        .wrapContentHeight()
                ) {
                    PieChart(
                        modifier = Modifier
                            .height(100.dp)
                            .width(200.dp),
                        pieData = listOf(
                            PieData(
                                uiState.caloriesBurnt.toFloat(),
                                color = MaterialTheme.colorScheme.caloriesBurnt
                            ),
                            PieData(
                                uiState.caloriesConsumed.toFloat(),
                                color = MaterialTheme.colorScheme.caloriesConsumed
                            ),
                        ),
                        config = PieConfig(isDonut = true, expandDonutOnClick = false),
                    )
                }
                Box(Modifier.weight(1F)) {
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            color = MaterialTheme.colorScheme.onSurface,
                            style = MaterialTheme.typography.titleMedium,
                            text = "${uiState.caloriesBurnt} kcal"
                        )
                        Text(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            style = MaterialTheme.typography.bodyMedium,
                            text = "소모"
                        )
                    }
                }
            }
        }
    }
}

@Preview
@Composable
fun TotalCardPreview() {
    SstudeTheme {
        TotalCardContent(
            uiState = TotalCaloriesView()
        )
    }
}