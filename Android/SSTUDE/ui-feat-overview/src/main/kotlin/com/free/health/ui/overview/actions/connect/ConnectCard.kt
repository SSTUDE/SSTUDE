package com.free.health.ui.overview.actions.connect

import android.content.res.Configuration.UI_MODE_NIGHT_NO
import android.content.res.Configuration.UI_MODE_NIGHT_YES
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.free.health.ui.common.theme.SstudeTheme

@Composable
fun ConnectCard(isButtonEnabled: Boolean, onConnectButtonClicked: () -> Unit) {
    ConnectCardContent(
        isButtonEnabled = isButtonEnabled,
        onConnectButtonClicked = onConnectButtonClicked
    )
}

@Composable
fun ConnectCardContent(
    isButtonEnabled: Boolean,
    modifier: Modifier = Modifier,
    onConnectButtonClicked: () -> Unit,
) {
    ElevatedCard(
        modifier = modifier
            .fillMaxWidth()
            .wrapContentHeight(),
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                color = MaterialTheme.colorScheme.onSurface,
                style = MaterialTheme.typography.titleMedium,
                text = "1. Health Connect APK 설치"
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                style = MaterialTheme.typography.bodySmall,
                text = "서비스를 사용하기 위해서는 헬스 커넥트 APK(Play 스토어에서 사용 가능)가 먼저 설치되어 있어야 합니다.",
            )
            Spacer(modifier = Modifier.height(8.dp))
            Button(onClick = onConnectButtonClicked, enabled = isButtonEnabled) {
                Text(text = "다운로드")
            }
        }
    }
}

@Preview(uiMode = UI_MODE_NIGHT_YES)
@Composable
fun OverviewScreenPreviewDark() {
    SstudeTheme {
        ConnectCardContent(onConnectButtonClicked = {}, isButtonEnabled = true)
    }
}

@Preview(uiMode = UI_MODE_NIGHT_NO)
@Composable
fun OverviewScreenPreviewLight() {
    SstudeTheme {
        ConnectCardContent(onConnectButtonClicked = {}, isButtonEnabled = true)
    }
}