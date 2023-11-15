package com.free.health.ui.overview.actions.permissions

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
fun RequestPermissionsCard(
    isButtonEnabled: Boolean,
    onPermissionsClicked: () -> Unit,
) {
    RequestPermissionsCardContent(
        isButtonEnabled = isButtonEnabled,
        onPermissionsClicked = onPermissionsClicked
    )
}

@Composable
fun RequestPermissionsCardContent(
    modifier: Modifier = Modifier,
    isButtonEnabled: Boolean,
    onPermissionsClicked: () -> Unit,
) {
    ElevatedCard(
        modifier = modifier
            .fillMaxWidth()
            .wrapContentHeight()
    ) {
        Column(modifier = modifier.padding(12.dp)) {
            Text(
                color = MaterialTheme.colorScheme.onSurface,
                style = MaterialTheme.typography.titleMedium,
                text = "2. Health Data 권한 수락"
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                style = MaterialTheme.typography.bodySmall,
                text = "서비스를 사용하기 위해서는 명시되어 있는 권한을 모두 수락해 주십시오.",
            )
            Spacer(modifier = Modifier.height(8.dp))
            Button(onClick = onPermissionsClicked, enabled = isButtonEnabled) {
                Text(text = "수락하기")
            }
        }
    }
}

@Preview(uiMode = UI_MODE_NIGHT_YES)
@Composable
fun OverviewScreenPreviewDark() {
    SstudeTheme {
        RequestPermissionsCardContent(onPermissionsClicked = {}, isButtonEnabled = true)
    }
}

@Preview(uiMode = UI_MODE_NIGHT_NO)
@Composable
fun OverviewScreenPreviewLight() {
    SstudeTheme {
        RequestPermissionsCardContent(onPermissionsClicked = {}, isButtonEnabled = true)
    }
}