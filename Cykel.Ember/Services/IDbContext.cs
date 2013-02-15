using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cykel.Ember.Services
{
    public abstract class IDbContext
    {
        public abstract IStationRepository Stations { get; }

        public IDbContext()
        {
        }
    }
}