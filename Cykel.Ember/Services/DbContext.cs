using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cykel.Ember.Services
{
    public class DbContext: IDbContext
    {
        private StationRepository _stations = new StationRepository();

        public DbContext()
        {
        }

        public override IStationRepository Stations
        {
            get { return _stations; }
        }
    }
}