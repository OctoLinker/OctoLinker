# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/)
from .. import subpackage1

# @Disabled OctoLinkerResolve(<root>/python/relative/)
from ... import relative

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1.classes import MyClass1

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ...relative.subpackage1 import classes
# @Disabled OctoLinkerResolveAbove(<root>/python/relative/subpackage1)

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/)
from ...relative import subpackage1
# @Disabled OctoLinkerResolveAbove(<root>/python/relative)

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1 import classes
# @Disabled OctoLinkerResolveAbove(<root>/python/subpackage1)
