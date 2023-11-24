# File generated from our OpenAPI spec by Stainless.

from __future__ import annotations

from typing import Union, Optional
from typing_extensions import Literal, Required, TypedDict

from .._types import FileTypes

__all__ = ["ImageCreateVariationParams"]


class ImageCreateVariationParams(TypedDict, total=False):
    image: Required[FileTypes]
    """The image to use as the basis for the variation(s).

    Must be a valid PNG file, less than 4MB, and square.
    """

    model: Union[str, Literal["dall-e-2"], None]
    """The model to use for image generation.

    Only `dall-e-2` is supported at this time.
    """

    n: Optional[int]
    """The number of images to generate.

    Must be between 1 and 10. For `dall-e-3`, only `n=1` is supported.
    """

    response_format: Optional[Literal["url", "b64_json"]]
    """The format in which the generated images are returned.

    Must be one of `url` or `b64_json`.
    """

    size: Optional[Literal["256x256", "512x512", "1024x1024"]]
    """The size of the generated images.

    Must be one of `256x256`, `512x512`, or `1024x1024`.
    """

    user: str
    """
    A unique identifier representing your end-user, which can help OpenAI to monitor
    and detect abuse.
    [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
    """
