from typing import List, Tuple

# The configuration for the weight coefficient
# format: ((min_weight, max_weight), coefficient)
DEFAULT_WEIGHT_COEFFICIENT_CONFIG = [
    ((0, 100), 0.01),
    ((100, 1000), 0.001),
    ((1000, 10000), 0.0001),
    ((10000, float("inf")), 0.00001),
]

# The configuration for the range search
# format: ((min_distance, max_distance), seach_ratio)
# The sum of search ratio should be 1 except some case we want to search as many as possible relationships.
# In this case, we set the search ratio to 1, and the other search ratio sum should be 1
DEFAULT_RANGE_SEARCH_CONFIG = [
    ((0.0, 0.25), 1),
    ((0.25, 0.35), 0.7),
    ((0.35, 0.45), 0.2),
    ((0.45, 0.55), 0.1),
]

DEFAULT_DEGREE_COEFFICIENT = 0.001


def get_weight_score(
    weight: int, weight_coefficient_config: List[Tuple[Tuple[int, int], float]]
) -> float:
    weight_score = 0.0
    remaining_weight = weight

    for weight_range, coefficient in weight_coefficient_config:
        if remaining_weight <= 0:
            break
        lower_bound, upper_bound = weight_range
        applicable_weight = min(upper_bound - lower_bound, remaining_weight)
        weight_score += applicable_weight * coefficient
        remaining_weight -= applicable_weight

    return weight_score


def get_degree_score(in_degree: int, out_degree: int, degree_coefficient) -> float:
    return (in_degree - out_degree) * degree_coefficient


def calculate_relationship_score(
    embedding_distance: float,
    weight: int,
    in_degree: int,
    out_degree: int,
    alpha: float,
    weight_coefficient_config: List[
        Tuple[Tuple[int, int], float]
    ] = DEFAULT_WEIGHT_COEFFICIENT_CONFIG,
    degree_coefficient: float = DEFAULT_DEGREE_COEFFICIENT,
    with_degree: bool = False,
) -> float:
    weighted_score = get_weight_score(weight, weight_coefficient_config)
    degree_score = 0
    if with_degree:
        degree_score = get_degree_score(in_degree, out_degree, degree_coefficient)
    return alpha * (1 / embedding_distance) + weighted_score + degree_score
