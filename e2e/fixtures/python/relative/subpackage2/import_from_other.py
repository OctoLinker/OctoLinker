# @OctoLinkerResolve(<root>/python/relative/subpackage1/)
from .. import subpackage1

# @OctoLinkerResolve(<root>/python/relative/)
from ... import relative

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1.classes import MyClass1

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ...relative.subpackage1 import classes
# @OctoLinkerResolveAbove(<root>/python/relative/subpackage1)

# @OctoLinkerResolve(<root>/python/relative/subpackage1/)
from ...relative import subpackage1
# @OctoLinkerResolveAbove(<root>/python/relative)

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1 import classes
# @OctoLinkerResolveAbove(<root>/python/subpackage1)