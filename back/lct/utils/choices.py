def count_max_length(choices_obj):
    values = [choice[0] for choice in choices_obj]
    return max([len(val) for val in values])
