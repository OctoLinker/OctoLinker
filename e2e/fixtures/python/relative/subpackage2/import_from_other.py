# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1.classes import MyClass1

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ...relative.subpackage1 import classes
#    ^ should resolve folder        ^ should resolve file

# @OctoLinkerResolve(<root>/python/relative/subpackage1/)
from ...relative import subpackage1

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from ..subpackage1 import classes