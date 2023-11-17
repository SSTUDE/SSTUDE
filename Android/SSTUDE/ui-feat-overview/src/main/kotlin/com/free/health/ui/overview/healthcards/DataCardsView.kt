package com.free.health.ui.overview.healthcards

import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.remember
import androidx.compose.runtime.*
import androidx.compose.material.TextField
import androidx.compose.material.Button
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.domain.base.toDayMonthYear

import com.free.health.ui.common.theme.SstudeTheme
import com.free.health.ui.overview.healthcards.burnt.CaloriesBurntDataCard
import com.free.health.ui.overview.healthcards.calories.CaloriesDataCard
import com.free.health.ui.overview.healthcards.sleep.SleepDataCard
import com.free.health.ui.overview.healthcards.steps.StepsDataCard
import com.free.health.ui.overview.healthcards.total.TotalCard
import com.free.health.data.healthconnect.entity.request.LoginRequest
import com.free.health.ui.overview.healthcards.steps.StepsKcalDataCard
//import com.free.health.ui.overview.healthcards.weight.WeightDataCard
import java.time.LocalDate

@Composable
fun DataCardsView(modifier: Modifier = Modifier) {
    val viewModel = hiltViewModel<DataCardViewModel>()
    DataCardsViewContent(
        modifier = modifier,
        uiState = viewModel.uiState,
        onDateSelected = viewModel::onDateSelected,
        viewModel = viewModel
//        onSleepClicked = viewModel::onSleepClicked,
//        onWeightClicked = viewModel::onWeightClicked
    )
}

@Composable
fun DataCardsViewContent(
    modifier: Modifier = Modifier,
    uiState: DataCardViewState,
    onDateSelected: (LocalDate) -> Unit,
    viewModel: DataCardViewModel?
) {
    // 문자열 상태를 저장하는 state
    var certification by remember { mutableStateOf("") }

    DateCarousel(
        selectedDate = uiState.selectedDate,
        onDateSelected = { onDateSelected(it) })
    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .fillMaxWidth()
    ) {
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = " ${uiState.selectedDate.toDayMonthYear()}".uppercase(),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.labelMedium
        )
        Spacer(modifier = Modifier.height(8.dp))
        TotalCard(date = uiState.selectedDate)
        Spacer(modifier = Modifier.height(16.dp))
        Row {
            val reusableModifier = Modifier.weight(0.5F, false).height(160.dp)
            SleepDataCard(
                modifier = reusableModifier,
                date = uiState.selectedDate,
                onClicked = {}
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Row {
            StepsDataCard(
                date = uiState.selectedDate,
                onClicked = {}
            )
        }
        Spacer(modifier = Modifier.height(8.dp))
        Row {
            val reusableModifier = Modifier.weight(0.5F, false).height(160.dp)
            CaloriesDataCard(
                modifier = reusableModifier,
                date = uiState.selectedDate,
                onClicked = {}
            )

            Spacer(modifier = Modifier.width(8.dp))
            StepsKcalDataCard(
                modifier = reusableModifier,
                date = uiState.selectedDate,
                onClicked = {}
            )
        }

        Spacer(modifier = Modifier.height(8.dp))
        Row {
            TextField(
                value = certification,
                onValueChange = { certification = it },
                label = { Text("인증번호") }
            )
            Button(onClick = {
                if (viewModel != null) {
                    val request = LoginRequest(certification)
                    Log.d("DataCard", "입력값?: $request")
                    viewModel.sendHealthData(request)  //  서버에 데이터 전송
                }
            }) {
                Text("입력")
            }
        }
    }
}


//@Preview
//@Composable
//fun DataCardsViewPreview() {
//    SstudeTheme {
//        DataCardsViewContent(
//            uiState = DataCardViewState(LocalDate.now()),
//            onDateSelected = { /* NO OP*/ },
////            viewModel = DataCardViewModel()
////            onSleepClicked = { /* NO OP*/ },
////            onWeightClicked = { /* NO OP*/ },
//        )
//    }
//}
