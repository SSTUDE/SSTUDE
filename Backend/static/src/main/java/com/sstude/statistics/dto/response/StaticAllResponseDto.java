package com.sstude.statistics.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class StaticAllResponseDto {
    private ArrayList<Integer> makeup;
    private ArrayList<Integer> clothes;
}
